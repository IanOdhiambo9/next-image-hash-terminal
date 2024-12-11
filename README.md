# Image Hash Adjuster Tool

A powerful Node.js utility to adjust the hash of an image file to match a given prefix. This script generates an adjusted file that displays identically to the human eye but has a cryptographic hash (SHA-512) starting with the specified hex string.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
  - [Example Command](#example-command)
- [How It Works](#how-it-works)
- [Error Handling](#error-handling)
- [License](#license)

---

## Overview

This tool provides a mechanism to "spoof" the hash of an image file. Using a cryptographic hash function (SHA-512), it appends random bytes to an image file until the hash of the modified file begins with the user-defined hex prefix.

For example:

```bash
spoof 0x24 original.jpg altered.jpg
```
Generates an adjusted file `altered.jpg` with a SHA-512 hash starting with `24`.

---

## Features

- Supports SHA-512 hashing for robust and secure operations.
- Maintains visual integrity of the input image.
- Processes any image format supported by the file system (e.g., JPG, PNG, etc.).
- Command-line interface for easy usage.

---

## Dependencies

The tool relies on the following libraries:

- **Node.js**: JavaScript runtime environment.
- **fs**: File system module for reading/writing files.
- **crypto**: Provides cryptographic functionality.
- **path**: Utilities for working with file and directory paths.

### Installing Dependencies

Ensure you have Node.js installed. Run the following command to install dependencies:

```bash
npm install
```

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project_directory>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Compile the TypeScript file (optional for runtime efficiency):

   ```bash
   npx tsc index.ts
   ```

---

## Usage

To use the script, run it from the terminal with the following syntax:

```bash
node index.js <targetPrefix> <inputFile> <outputFile>
```

### Example Command

```bash
node index.js 24 input.jpg output.jpg
```

- **`targetPrefix`**: A hexadecimal string representing the desired hash prefix (e.g., `24` or `0x24`).
- **`inputFile`**: Path to the original image file.
- **`outputFile`**: Path to save the adjusted image file.

---

## How It Works

### Step-by-Step Breakdown

1. **Input Validation**:
   - Verifies the existence of the input file.
   - Ensures the `targetPrefix` is a valid hex string.

2. **Buffer Modification**:
   - Reads the original image into a buffer.
   - Iteratively appends random bytes to the buffer until the hash of the adjusted buffer starts with the target prefix.

3. **Hash Calculation**:
   - Computes the SHA-512 hash of the buffer during each iteration using the `crypto` module.

4. **Output**:
   - Writes the adjusted buffer to the specified output file.

5. **Completion**:
   - Displays success messages, including the adjusted file path and its hash.

---

## Error Handling

The script includes robust error handling:

- Ensures that the input file exists and is readable.
- Validates the hex format of the target prefix.
- Captures and logs errors during file operations or hash adjustments.

Common errors and their resolutions:

| Error                                 | Cause                                        | Resolution                                  |
|---------------------------------------|---------------------------------------------|---------------------------------------------|
| `Input file does not exist`           | File path is incorrect or file is missing.  | Verify the file path and ensure it exists. |
| `targetPrefix must be a valid hex string` | Invalid characters in the prefix.           | Use a valid hexadecimal string.            |

---

### Enjoy using the Image Hash Adjuster Tool! 🎉