const axios = require('axios');
const Joi = require('joi');

async function getVideoWithoutWatermark(tiktokVideoUrl) {
  try {
    // Validate TikTok URL using Joi
    const schema = Joi.string().uri().regex(/tiktok\.com\/.*\/video\/\d+/).required();
    const { error } = schema.validate(tiktokVideoUrl);
    
    if (error) {
      throw new Error('Invalid TikTok video URL');
    }
    
    // Send POST request to https://wrtik.com/getTik
    const response = await axios.post('https://wrtik.com/getTik', {
      URL: tiktokVideoUrl
    });
    
    const videoLink = response.data.videoLink;
    console.log('Video Link without Watermark:', videoLink);
    return videoLink;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// Example usage
const tiktokUrl = 'https://www.tiktok.com/@exampleuser/video/1234567890';
getVideoWithoutWatermark(tiktokUrl);
