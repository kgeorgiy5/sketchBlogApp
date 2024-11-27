import sharp from "sharp";

export default async function(base64:string){
    const imgBuffer = Buffer.from(base64, "base64");
    const compressedImgBuffer = await sharp(imgBuffer).resize({width:300, height:300}).toBuffer();
    return compressedImgBuffer.toString("base64");
}