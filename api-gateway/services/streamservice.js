class StreamService {
  constructor() {
    this.clients = new Map(); // clientId -> { res, id }
    this.clientCounter = 0;
  }

  addClient(res) {
    const clientId = ++this.clientCounter;
    this.clients.set(clientId, { res, id: clientId });
    console.log(`➕ Client ${clientId} connected (Total: ${this.clients.size})`);
    
    // Send connection confirmation
    res.write(`data: ${JSON.stringify({
      type: 'connection',
      message: 'SSE connection established',
      timestamp: new Date().toISOString()
    })}\n\n`);

    // Return the client ID for later removal
    return clientId;
  }

  removeClient(clientId) {
    if (this.clients.has(clientId)) {
      this.clients.delete(clientId);
      console.log(`➖ Client ${clientId} disconnected (Total: ${this.clients.size})`);
    }
  }

  broadcast(data) {
    console.log(`📢 Broadcasting to ${this.clients.size} clients`);
    
    this.clients.forEach((client, clientId) => {
      try {
        client.res.write(`data: ${JSON.stringify({
          ...data,
          timestamp: new Date().toISOString()
        })}\n\n`);
      } catch (e) {
        console.error(`💥 Error writing to client ${clientId}:`, e.message);
        this.removeClient(clientId);
      }
    });
  }
}

module.exports = new StreamService();