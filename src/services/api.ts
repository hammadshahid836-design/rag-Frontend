/**
 * API Service - Connects Frontend to Backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ChatRequest {
  query: string;
  user_id?: number;
}

interface ChatResponse {
  answer: string;
  user_id: number;
  timestamp: string;
}

interface UserProfile {
  id?: number;
  name: string;
  email: string;
  plan_type?: string;
}

class APIService {
  async chat(request: ChatRequest): Promise<ChatResponse> {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: request.query,
        user_id: request.user_id || 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`Chat failed: ${response.statusText}`);
    }

    return await response.json();
  }

  async getHealth(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.statusText}`);
    }
    return await response.json();
  }

  async getUser(userId: number): Promise<UserProfile> {
    const response = await fetch(`${API_BASE_URL}/user/${userId}`);
    if (!response.ok) {
      throw new Error(`Get user failed: ${response.statusText}`);
    }
    return await response.json();
  }

  async createUser(profile: UserProfile): Promise<UserProfile> {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      throw new Error(`Create user failed: ${response.statusText}`);
    }

    return await response.json();
  }

  async getConversations(userId: number, limit = 50): Promise<any> {
    const response = await fetch(
      `${API_BASE_URL}/user/${userId}/conversations?limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`Get conversations failed: ${response.statusText}`);
    }

    return await response.json();
  }

  async addKnowledge(request: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/knowledge/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Add knowledge failed: ${response.statusText}`);
    }

    return await response.json();
  }

  async getKnowledgeMetadata(category?: string): Promise<any> {
    let url = `${API_BASE_URL}/knowledge/metadata`;
    if (category) {
      url += `?category=${encodeURIComponent(category)}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Get knowledge metadata failed: ${response.statusText}`);
    }

    return await response.json();
  }
}

export const apiService = new APIService();
