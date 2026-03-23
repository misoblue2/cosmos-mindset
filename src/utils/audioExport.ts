export async function mixAudioToWav(
    voiceUrl: string,
    bgmUrl: string | null,
    durationMin: number,
    onProgress: (percent: number) => void
): Promise<string> {
    const sampleRate = 44100;
    const targetFrames = durationMin * 60 * sampleRate;
    
    // Fallback simple safety cap (Max 30 min ~300MB mono to save RAM)
    const MAX_FRAMES = 30 * 60 * sampleRate;
    const framesToRender = Math.min(targetFrames, MAX_FRAMES);
    
    // We use mono (1 channel) for voice+BGM to save half the memory and bandwidth (1 hour mono WAV = 317MB)
    const ctx = new window.OfflineAudioContext(1, framesToRender, sampleRate);
    
    // Fetch and decode voice
    onProgress(10);
    const voiceRes = await fetch(voiceUrl);
    const voiceBuffer = await ctx.decodeAudioData(await voiceRes.arrayBuffer());
    
    onProgress(30);
    // Fetch and decode BGM if given
    let bgmBuffer = null;
    if (bgmUrl) {
        try {
            const bgmRes = await fetch(bgmUrl);
            bgmBuffer = await ctx.decodeAudioData(await bgmRes.arrayBuffer());
        } catch (e) {
            console.error("BGM fetch/decode failed, proceeding without BGM", e);
        }
    }
    
    onProgress(50);
    
    // Setup voice node (Looping)
    const voiceNode = ctx.createBufferSource();
    voiceNode.buffer = voiceBuffer;
    voiceNode.loop = true;
    
    const voiceGain = ctx.createGain();
    voiceGain.gain.value = 1.0;
    voiceNode.connect(voiceGain);
    voiceGain.connect(ctx.destination);
    voiceNode.start(0);

    // Setup BGM node (Looping)
    if (bgmBuffer) {
        const bgmNode = ctx.createBufferSource();
        bgmNode.buffer = bgmBuffer;
        bgmNode.loop = true;
        
        const bgmGain = ctx.createGain();
        bgmGain.gain.value = 0.15; // 15% volume for BGM
        bgmNode.connect(bgmGain);
        bgmGain.connect(ctx.destination);
        bgmNode.start(0);
    }
    
    onProgress(70);
    const renderedBuffer = await ctx.startRendering();
    onProgress(90);
    
    // Convert to WAV
    const wavBlob = audioBufferToWav(renderedBuffer);
    onProgress(100);
    
    return URL.createObjectURL(wavBlob);
}

// Convert AudioBuffer to WAV format Blob
function audioBufferToWav(buffer: AudioBuffer): Blob {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    
    let result = null;
    const length = buffer.length * numChannels * (bitDepth / 8);
    const bufferArray = new ArrayBuffer(44 + length);
    const view = new DataView(bufferArray);
    
    function setString(offset: number, str: string) {
        for (let i = 0; i < str.length; i++) {
            view.setUint8(offset + i, str.charCodeAt(i));
        }
    }
    
    // WAV Header
    setString(0, 'RIFF');
    view.setUint32(4, 36 + length, true);
    setString(8, 'WAVE');
    setString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * (bitDepth / 8), true);
    view.setUint16(32, numChannels * (bitDepth / 8), true);
    view.setUint16(34, bitDepth, true);
    setString(36, 'data');
    view.setUint32(40, length, true);
    
    // Write PCM data
    const channelData = new Float32Array(buffer.length);
    buffer.copyFromChannel(channelData, 0); // only 1 channel due to mono OfflineAudioContext
    
    let offset = 44;
    for (let i = 0; i < buffer.length; i++) {
        let sample = Math.max(-1, Math.min(1, channelData[i]));
        sample = sample < 0 ? sample * 32768 : sample * 32767;
        view.setInt16(offset, sample, true);
        offset += 2;
    }
    
    return new Blob([view], { type: 'audio/wav' });
}
