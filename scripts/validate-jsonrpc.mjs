/**
 * Validate basic JSON-RPC 2.0 request structure.
 * Standalone utility for MCP development.
 */

export function validateJsonRpcRequest(request) {
  const errors = [];

  if (
    request === null ||
    typeof request !== "object" ||
    Array.isArray(request)
  ) {
    return {
      valid: false,
      errors: ["Request must be a JSON object"]
    };
  }

  if (request.jsonrpc !== "2.0") {
    errors.push("jsonrpc must equal '2.0'");
  }

  if (
    typeof request.method !== "string" ||
    request.method.length === 0
  ) {
    errors.push("method must be a non-empty string");
  }

  if (
    Object.hasOwn(request, "params") &&
    (
      request.params === null ||
      typeof request.params !== "object"
    )
  ) {
    errors.push("params must be an object or array");
  }

  if (Object.hasOwn(request, "id")) {
    const id = request.id;

    if (
      id !== null &&
      typeof id !== "string" &&
      !(typeof id === "number" && Number.isFinite(id))
    ) {
      errors.push("id must be a string, number, or null");
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
