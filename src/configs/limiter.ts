import { rateLimit } from "express-rate-limit";
import { Request, Response } from "express";
import { UAParser } from "ua-parser-js";
import { nodeMode, nodeEnv } from "./envVars";
import { handleResponse } from "../utils/controller";
import { RateLimitT } from "../types/common";

const periodOfTime = 15 * 60 * 1000; // 15 minutes
const maxNumberOfRequests = nodeEnv === nodeMode.dev ? 1_000_000 : 200; // Limit each IP to 200 requests per `window` (here, per 15 minutes).
const loginResetTime = 10 * 60 * 1000; // 10 minutes
const loginMaxAttempts = nodeEnv === nodeMode.dev ? 1_000 : 5; // maximum number of attempts (per 10 minutes)

const handler = (req: Request, res: Response) => {
  if ("rateLimit" in req) {
    const rateLimit = req.rateLimit as RateLimitT;
    const date = new Date(rateLimit.resetTime).toLocaleTimeString();

    return handleResponse(res, 429, `Too Many Requests try again at ${date}`);
  }

  return handleResponse(res, 429, "Too Many Requests!");
};

// Protection against Distributed Denial-of-Service (DDoS) Attack
export const limiter = rateLimit({
  windowMs: periodOfTime,
  limit: maxNumberOfRequests,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: (req) => {
    const ip = req.ip;
    const userAgent = req.get("User-Agent");

    const parser = new UAParser();
    parser.setUA(userAgent || "");
    const result = parser.getResult();

    // Combine os and ip address to form a unique key
    return `${result.os.name}-${result.browser.name}:${ip}`;
  },
  handler,
});

// Limit attempts to enter incorrect login data
export const loginLimiter = rateLimit({
  windowMs: loginResetTime,
  max: loginMaxAttempts,
  keyGenerator: (req) => {
    const email = req.body.email || "";
    const ip = req.ip;

    // Combine email and ip address to form a unique key
    return `${email}:${ip}`;
  },
  handler,
});
