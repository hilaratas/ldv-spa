import {getJWTPayload} from './token'
import {fbUserPayload, User} from "@/typings";

export function user (fbPayload: fbUserPayload) :User {
  return {
    email: fbPayload.email,
    email_verified: fbPayload.email_verified,
    auth_time: fbPayload.auth_time,
    user_id: fbPayload.user_id,
    exp_time:  fbPayload.exp // истекает
  }
}