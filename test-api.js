// Simple test script to validate the Notes API
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🔍 Testing Notes API...\n');

  try {
    // Test health check
    console.log('1. Testing health check...');
    const health = await axios.get(`${API_BASE}/health`);
    console.log('✅ Health check passed:', health.data);
    
    // Test creating a note
    console.log('\n2. Testing note creation...');
    const noteData = {
      title: 'Test Note',
      content: 'This is a test note with some content to search through.',
      tags: ['test', 'sample', 'demo']
    };
    
    const createResponse = await axios.post(`${API_BASE}/notes`, noteData);
    console.log('✅ Note created:', createResponse.data._id);
    const noteId = createResponse.data._id;
    
    // Test getting all notes
    console.log('\n3. Testing get all notes...');
    const notesResponse = await axios.get(`${API_BASE}/notes`);
    console.log('✅ Retrieved notes:', notesResponse.data.notes.length, 'notes found');
    
    // Test search functionality
    console.log('\n4. Testing search...');
    const searchResponse = await axios.get(`${API_BASE}/notes?search=test`);
    console.log('✅ Search results:', searchResponse.data.notes.length, 'notes found');
    
    // Test tag filtering
    console.log('\n5. Testing tag filtering...');
    const tagResponse = await axios.get(`${API_BASE}/notes?tags=test`);
    console.log('✅ Tag filter results:', tagResponse.data.notes.length, 'notes found');
    
    // Test getting tags
    console.log('\n6. Testing get all tags...');
    const tagsResponse = await axios.get(`${API_BASE}/notes/tags/all`);
    console.log('✅ Available tags:', tagsResponse.data);
    
    // Test updating the note
    console.log('\n7. Testing note update...');
    const updateData = {
      title: 'Updated Test Note',
      content: 'This note has been updated with new content.',
      tags: ['test', 'updated', 'modified']
    };
    
    const updateResponse = await axios.put(`${API_BASE}/notes/${noteId}`, updateData);
    console.log('✅ Note updated:', updateResponse.data.title);
    
    // Test getting single note
    console.log('\n8. Testing get single note...');
    const singleNote = await axios.get(`${API_BASE}/notes/${noteId}`);
    console.log('✅ Single note retrieved:', singleNote.data.title);
    
    // Test pagination
    console.log('\n9. Testing pagination...');
    const paginationResponse = await axios.get(`${API_BASE}/notes?page=1&limit=5`);
    console.log('✅ Pagination working:', paginationResponse.data.pagination);
    
    // Clean up - delete the test note
    console.log('\n10. Cleaning up - deleting test note...');
    await axios.delete(`${API_BASE}/notes/${noteId}`);
    console.log('✅ Test note deleted');
    
    console.log('\n🎉 All API tests passed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = testAPI;