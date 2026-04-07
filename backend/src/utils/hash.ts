import bcrypt from 'bcrypt';

// hash 
export const makeHash = async (plainText: string, number: number = 10) => {
    const hashedPassword = await bcrypt.hash(plainText, number);
    return hashedPassword;
}

// verify hasj 
export const verifyHash = async (plainText: string, hashText: string) => {
    const isMatch = await bcrypt.compare(plainText, hashText);
    return isMatch;
}