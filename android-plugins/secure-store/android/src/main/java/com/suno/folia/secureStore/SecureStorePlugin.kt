package com.sunofolia.secureStore

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.annotation.Method

class SecureStorePlugin : Plugin() {

  @Method
  fun setValue(key: String, value: String): JSObject {
    // TODO: Implement Android Keystore secure storage
    val result = JSObject()
    result.put("status", "not_implemented")
    result.put("message", "Secure storage not yet implemented in v1")
    return result
  }

  @Method
  fun getValue(key: String): JSObject {
    val result = JSObject()
    result.put("status", "not_implemented")
    result.put("message", "Secure storage not yet implemented in v1")
    return result
  }

  @Method
  fun removeValue(key: String): JSObject {
    val result = JSObject()
    result.put("status", "not_implemented")
    result.put("message", "Secure storage not yet implemented in v1")
    return result
  }
}