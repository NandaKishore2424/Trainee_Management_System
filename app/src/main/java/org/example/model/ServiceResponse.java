package org.example.model;

/**
 * Generic response class for service operations
 * 
 * @param <T> The type of data being returned
 */
public class ServiceResponse<T> {
  private T data;
  private boolean success;
  private String message;

  public ServiceResponse() {
  }

  public ServiceResponse(T data, boolean success, String message) {
    this.data = data;
    this.success = success;
    this.message = message;
  }

  public T getData() {
    return data;
  }

  public void setData(T data) {
    this.data = data;
  }

  public boolean isSuccess() {
    return success;
  }

  public void setSuccess(boolean success) {
    this.success = success;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}