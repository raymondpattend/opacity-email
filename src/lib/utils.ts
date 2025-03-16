import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Obfuscates an email address by replacing the local and the domain name with dots to hide.
 */
export function obfuscateEmail(email: string) {
  const [localPart, domain] = email.split('@');
  const [domainName, tld] = domain.split('.');
  
  const obfuscatedLocal = localPart.length > 6 
      ? localPart.slice(0, 2) + '•••••' + localPart.slice(-1)
      : localPart;
      
  const obfuscatedDomain = domainName.length > 3
      ? domainName.slice(0, 2) + '•'.repeat(domainName.length - 4) + domainName.slice(-1)
      : domainName;

  return `${obfuscatedLocal}@${obfuscatedDomain}.${tld}`;
}