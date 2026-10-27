package com.sunofolia.exportSink

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.annotation.Method

class ExportSinkPlugin : Plugin() {

  @Method
  fun startExport(outputPath: String, format: String): JSObject {
    // TODO: Implement video export to Android file storage
    val result = JSObject()
    result.put("status", "not_implemented")
    result.put("message", "Video export sink not yet implemented in v1")
    return result
  }

  @Method
  fun cancelExport(): JSObject {
    val result = JSObject()
    result.put("status", "cancelled")
    result.put("message", "Export cancellation received")
    return result
  }
}