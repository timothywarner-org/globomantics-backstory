# 🔌 API Specifications - Mock APIs for Development

OpenAPI specifications and mock endpoints for teaching API development and integration.

---

## 📁 Available APIs

### 🤖 Robot Control API
- **Spec:** `robot-control-api.yaml`
- **Purpose:** Individual robot management
- **Endpoints:** CRUD operations, telemetry, commands
- **Auth:** Bearer token (fake)

### 🚁 Fleet Management API  
- **Spec:** `fleet-management-api.yaml`
- **Purpose:** Fleet-wide operations
- **Endpoints:** Analytics, batch commands, scheduling
- **Auth:** API key (fake)

### 📡 Telemetry Streaming API
- **Spec:** `telemetry-websocket.yaml`
- **Purpose:** Real-time data streaming
- **Protocol:** WebSocket
- **Events:** Temperature, location, battery status

### 🔐 Auth Service API
- **Spec:** `auth-service-api.yaml`
- **Purpose:** OAuth 2.0 demonstration
- **Flows:** Authorization code, client credentials
- **Tokens:** JWT format (fake signatures)

---

## 🚦 Quick Usage

### View API Docs
1. Copy the YAML file
2. Paste into [editor.swagger.io](https://editor.swagger.io)
3. Explore the interactive documentation

### Import to Postman
1. Open Postman
2. Import > File > Select the YAML
3. Collection ready for testing

### Generate Mock Server
```bash
# Using Prism
npx @stoplight/prism-cli mock robot-control-api.yaml

# Using json-server (for simple mocks)
npx json-server --watch mock-data.json
```

---

## 📝 Specification Details

Each API includes:
- ✅ Complete endpoint descriptions
- ✅ Request/response schemas
- ✅ Example payloads
- ✅ Error responses
- ✅ Authentication examples (fake tokens)

---

## 🎓 Teaching Scenarios

### API Design
- RESTful principles
- OpenAPI specification
- API versioning
- Error handling

### Client Development
- HTTP client usage
- Authentication flows
- Error handling
- Rate limiting

### Testing
- Postman collections
- Automated testing
- Mock servers
- Contract testing

---

## ⚠️ Security Note

All authentication tokens and keys are **FAKE** and clearly marked:
- `FAKE_TOKEN_EXAMPLE_DO_NOT_USE`
- `FAKE_API_KEY_EXAMPLE_12345`

---

## 🤝 Contributing

New API specs should:
- ✅ Follow OpenAPI 3.0 format
- ✅ Include comprehensive examples
- ✅ Use fake but realistic data
- ✅ Document all error cases
- ✅ Include a Postman collection