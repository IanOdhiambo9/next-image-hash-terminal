import * as fs from "fs";
import * as crypto from "crypto";
import * as path from "path";

/**
 * Adjusts the hash of an image file to start with a specific prefix.
 * @param filePath - The path to the input image file.
 * @param targetPrefix - The desired hash prefix.
 * @param outputFilePath - The path to save the altered image file.
 */
async function adjustImageHash(
  filePath: string,
  targetPrefix: string,
  outputFilePath: string
): Promise<void> {
  // Ensure the file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`Input file does not exist: ${filePath}`);
  }

  // Read the original file as a buffer
  const fileBuffer = fs.readFileSync(filePath);
  console.log("Read input file successfully.");
  console.log(`Original file size: ${fileBuffer.length} bytes.`);

  let adjustedBuffer = Buffer.from(fileBuffer); // Create a modifiable copy of the buffer
  let hash: string = ""; // Variable to store the current hash

  // Keep appending random bytes until the hash starts with the target prefix
  while (!hash.startsWith(targetPrefix)) {
    const randomByte: Buffer = crypto.randomBytes(1); // Generate a single random byte
    adjustedBuffer = Buffer.concat([adjustedBuffer, randomByte]) as any; // Append it to the buffer
    hash = crypto.createHash("sha512").update(adjustedBuffer).digest("hex"); // Compute the hash
  }

  console.log("Hash adjustment complete.");
  console.log(`Final hash: ${hash}`);

  // Write the adjusted buffer to the output file
  fs.writeFileSync(outputFilePath, adjustedBuffer);
  console.log(`Adjusted file saved to: ${outputFilePath}`);
}

/**
 * Main function to parse arguments and execute the hash adjustment.
 */
async function main(): Promise<void> {
  // Get command-line arguments
  const args = process.argv.slice(2);

  if (args.length !== 3) {
    console.error("Usage: node index.js <targetPrefix> <inputFile> <outputFile>");
    process.exit(1); // Exit with an error code
  }

  let [targetPrefix, inputFile, outputFile] = args;

  // Remove '0x' prefix if present
  if (targetPrefix.startsWith("0x") || targetPrefix.startsWith("0X")) {
    targetPrefix = targetPrefix.slice(2);
  }

  // Validate the targetPrefix
  if (!/^[0-9a-fA-F]+$/.test(targetPrefix)) {
    console.error("Error: targetPrefix must be a valid hex string.");
    process.exit(1);
  }

  try {
    // Resolve file paths to ensure correctness
    const inputFilePath = path.resolve(inputFile);
    const outputFilePath = path.resolve(outputFile);

    console.log("Starting hash adjustment...");
    console.log(`Target Prefix: ${targetPrefix}`);
    console.log(`Input File: ${inputFilePath}`);
    console.log(`Output File: ${outputFilePath}`);

    await adjustImageHash(inputFilePath, targetPrefix, outputFilePath);
    console.log("Operation completed successfully.");
  } catch (error) {
    console.error("An error occurred:", error.message);
    process.exit(1); // Exit with an error code
  }
}

// Run the main function
main();