package com.sunofolia.mediaSession

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.annotation.Method

class MediaSessionPlugin : Plugin() {

  @Method
  fun play(): JSObject {
    val result = JSObject()
    result.put("status", "play_requested")
    return result
  }

  @Method
  fun pause(): JSObject {
    val result = JSObject()
    result.put("status", "pause_requested")
    return result
  }

  @Method
  fun setProgress(currentMs: Long, totalMs: Long): JSObject {
    val result = JSObject()
    result.put("status", "progress_updated")
    result.put("currentMs", currentMs)
    result.put("totalMs", totalMs)
    return result
  }

  @Method
  fun setMetadata(title: String, artist: String): JSObject {
    val result = JSObject()
    result.put("status", "metadata_updated")
    result.put("title", title)
    result.put("artist", artist)
    return result
  }
}