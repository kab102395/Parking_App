use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::error::Error;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct FirestoreDocument {
    pub name: String,
    pub fields: HashMap<String, FirestoreFieldValue>,  // The fields of the document
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct FirestoreFieldValue {
    pub string_value: Option<String>,
    pub integer_value: Option<i64>,
    pub array_value: Option<FirestoreArrayValue>,
    pub boolean_value: Option<bool>,   // Boolean fields
    pub map_value: Option<HashMap<String, FirestoreFieldValue>>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct FirestoreArrayValue {
    pub values: Vec<FirestoreFieldValue>,  // Array values are stored as FirestoreFieldValues
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct FirestoreQueryResponse {
    // Define the structure based on the Firestore response format
    documents: Vec<FirestoreDocument>,
}
#[derive(Debug)]
pub enum FirestoreError {
    RequestError(reqwest::Error),
    DocumentError(String),
}

impl std::fmt::Display for FirestoreError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            FirestoreError::RequestError(err) => write!(f, "Request error: {}", err),
            FirestoreError::DocumentError(msg) => write!(f, "Document error: {}", msg),

        }
    }
}

impl Error for FirestoreError {}

pub async fn get_firestore_document(doc_path: &str) -> Result<FirestoreDocument, FirestoreError> {
    let url = format!("https://lao-app-e6f57.firebaseio.com/https://lao-app-e6f57.firebaseio.com/{}", doc_path);
    
    let client = Client::new();
    let response = client
        .get(&url)
        .send()
        .await
        .map_err(FirestoreError::RequestError)?
        .json::<FirestoreDocument>()
        .await
        .map_err(FirestoreError::RequestError)?;
    
    Ok(response)
}

#[derive(Serialize, Deserialize, Debug)]
struct Grant {
    name: String,
    questions: Vec<String>,
}

// Function to convert FirestoreDocument to Grant struct
fn firestore_document_to_grant(doc: FirestoreDocument) -> Result<Grant, FirestoreError> {
    // Access the 'name' field as a string
    let name = doc.fields.get("name")
        .and_then(|field| field.string_value.clone())
        .ok_or_else(|| FirestoreError::DocumentError("Missing 'name' field".to_string()))?; // Improved error handling

    // Access the 'questions' field as an array of strings
    let questions: Vec<String> = doc.fields.get("questions")
        .and_then(|field| field.array_value.as_ref())
        .map(|array| {
            array.values.iter()
                .filter_map(|f| f.string_value.clone())
                .collect::<Vec<String>>()
        })
        .unwrap_or_else(Vec::new); // Return an empty Vec if 'questions' is missing

    Ok(Grant {
        name,
        questions,
    })
}

#[derive(Serialize, Deserialize, Debug)]
struct Questions {
    answer: String,
    criteria: Option<String>,
    question: String,
    topic: Option<String>,
}

// Function to convert FirestoreDocument to Questions struct
fn firestore_document_to_questions(doc: FirestoreDocument) -> Result<Questions, FirestoreError> {
    let answer = doc.fields.get("answer")
        .and_then(|f| f.string_value.clone())
        .ok_or_else(|| FirestoreError::DocumentError("Missing 'answer' field".to_string()))?;

    let criteria = doc.fields.get("criteria")
        .and_then(|f| f.string_value.clone());

    let question = doc.fields.get("question")
        .and_then(|f| f.string_value.clone())
        .ok_or_else(|| FirestoreError::DocumentError("Missing 'question' field".to_string()))?;

    let topic = doc.fields.get("topic")
        .and_then(|f| f.string_value.clone());


    Ok(Questions {
        answer,
        criteria,
        question,
        topic,
    })
}

#[derive(Serialize, Deserialize, Debug)]
struct Settings {
    char_count: usize,
    id: u32,
    max_points: u32,
    word_count: usize,
}

// Function to convert FirestoreDocument to Settings struct
fn firestore_document_to_settings(doc: FirestoreDocument) -> Result<Settings, FirestoreError> {
    // Access fields as integers (for u32 and usize)
    let char_count = doc.fields.get("char_count")
        .and_then(|f| f.integer_value)
        .ok_or_else(|| FirestoreError::DocumentError("Missing 'char_count' field".to_string()))? as usize;

    let id = doc.fields.get("id")
        .and_then(|f| f.integer_value)
        .ok_or_else(|| FirestoreError::DocumentError("Missing 'id' field".to_string()))? as u32;
    
    let max_points = doc.fields.get("max_points")
        .and_then(|f| f.integer_value)
        .ok_or_else(|| FirestoreError::DocumentError("Missing 'max_points' field".to_string()))? as u32;
    
    let word_count = doc.fields.get("word_count")
        .and_then(|f| f.integer_value)
        .ok_or_else(|| FirestoreError::DocumentError("Missing 'word_count' field".to_string()))? as usize;

    Ok(Settings {
        char_count,
        id,
        max_points,
        word_count,
    })
}


