package com.sunofolia.lyricfiles

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.annotation.Method

class LyricFilesPlugin : Plugin() {

  @Method
  fun importLyricalFile(): JSObject {
    // TODO: Implement Android storage access for .lyricmv, LRC, TXT files
    val result = JSObject()
    result.put("status", "not_implemented")
    result.put("message", "Lyric file import not yet implemented in v1")
    return result
  }

  @Method
  fun exportLyricalFile(): JSObject {
    // TODO: Implement export of .lyricmv file via Android intent
    val result = JSObject()
    result.put("status", "not_implemented")
    result.put("message", "Lyric file export not yet implemented in v1")
    return result
  }
}