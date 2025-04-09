/**
 * Email validation utilities
 */

/**
 * Simple email validation using regex
 * @param {string} email - The email address to validate
 * @returns {boolean} - Returns true if email is valid, false otherwise
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Comprehensive email validation that checks:
 * - Basic email format
 * - Common typos in domain names
 * - Disposable email domains
 * - Maximum length
 * @param {string} email - The email address to validate
 * @returns {Object} - Returns an object with validation status and message
 */
export const validateEmailComprehensive = (email) => {
  // Basic format check
  if (!email || typeof email !== "string") {
    return {
      isValid: false,
      message: "Email is required and must be a string",
    };
  }

  // Length check
  if (email.length > 254) {
    return {
      isValid: false,
      message: "Email address is too long",
    };
  }

  // Basic format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: "Invalid email format",
    };
  }

  // Split email into local and domain parts
  const [localPart, domain] = email.split("@");

  // Check local part length
  if (localPart.length > 64) {
    return {
      isValid: false,
      message: "Local part of email is too long",
    };
  }

  // Check for common typos in domain names
  const commonTypos = {
    "gmail.com": ["gmial.com", "gamil.com", "gmai.com"],
    "yahoo.com": ["yaho.com", "yahooo.com"],
    "hotmail.com": ["hotmal.com", "hotmai.com"],
    "outlook.com": ["outlok.com", "outlock.com"],
  };

  for (const [correctDomain, typos] of Object.entries(commonTypos)) {
    if (typos.includes(domain)) {
      return {
        isValid: false,
        message: `Did you mean ${correctDomain}?`,
      };
    }
  }

  // List of common disposable email domains
  const disposableDomains = [
    "tempmail.com",
    "throwawaymail.com",
    "tempr.email",
    "disposablemail.com",
    "tempmailaddress.com",
  ];

  if (disposableDomains.includes(domain)) {
    return {
      isValid: false,
      message: "Disposable email addresses are not allowed",
    };
  }

  return {
    isValid: true,
    message: "Email is valid",
  };
};

// Example usage:
/*
const email = "user@example.com";
const simpleValidation = isValidEmail(email);
console.log(simpleValidation); // true

const comprehensiveValidation = validateEmailComprehensive(email);
console.log(comprehensiveValidation);
// { isValid: true, message: 'Email is valid' }
*/
