#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

#[napi]
fn hello() -> String {
    "Hello from Rust!".to_string()
}