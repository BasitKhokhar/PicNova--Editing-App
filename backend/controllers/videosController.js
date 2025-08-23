
exports.generateVideo = async (req, res) => {
  const { userId, imageUrl, prompt, modelUsed } = req.body;

  if (!userId || !modelUsed || !imageUrl) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const inputOptions = {
      image: imageUrl,
    };

    if (prompt) inputOptions.prompt = prompt;

    const output = await replicate.run(modelUsed, { input: inputOptions });

    const videoUrl = Array.isArray(output) ? output[0] : output;

    // Fetch video binary
    const response = await fetch(videoUrl);
    const buffer = await response.arrayBuffer();
    const blob = Buffer.from(buffer);

    const filename = `generated_video_${Date.now()}.mp4`;
    const storageRef = ref(storage, `GeneratedVideos/${filename}`);
    const uploadResult = await uploadBytesResumable(storageRef, blob, {
      contentType: 'video/mp4',
    });

    const firebaseVideoUrl = await getDownloadURL(uploadResult.ref);

    const saved = await prisma.videos.create({
      data: {
        user_id: parseInt(userId),
        model_used: modelUsed,
        prompt_used: prompt || null,
        url: firebaseVideoUrl,
      },
    });

    res.json({
      success: true,
      videoId: saved.id,
      videoUrl: firebaseVideoUrl,
    });
  } catch (err) {
    console.error('Video generation failed:', err.message);
    res.status(500).json({ error: 'Video generation failed', details: err.message });
  }
};



// getAllVideosByUser.js
exports.getAllVideosByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const videos = await prisma.videos.findMany({
      where: { user_id: parseInt(userId) },
      orderBy: { created_at: 'desc' },
    });

    res.json(videos);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};
