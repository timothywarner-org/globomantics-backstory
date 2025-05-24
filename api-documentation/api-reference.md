# Globomantics Robotics API Reference

---
**Attribution**: Created by Tim Warner ([TechTrainerTim.com](https://techtrainertim.com)), Principal Author at [Pluralsight](https://pluralsight.com).  
These materials are part of Pluralsight training content and are provided for educational purposes only.  
**Disclaimer**: No warranty, express or implied, is provided. Use at your own risk.

---

## API Overview

The Globomantics Robotics API provides programmatic access to robot management, telemetry data, and control systems. Built on RESTful principles with real-time WebSocket support for live robot control.

### Base URL
```
Production: https://api.globomantics.com/v2
Staging: https://api-staging.globomantics.com/v2
```

### Authentication
All API requests require authentication using API keys or OAuth 2.0 tokens.

```http
Authorization: Bearer FAKE_TOKEN_EXAMPLE_DO_NOT_USE
X-API-Key: FAKE_KEY_EXAMPLE_1234567890_DO_NOT_USE
```

## Core Endpoints

### 1. Robot Management

#### List All Robots
```http
GET /robots
```

**Query Parameters:**
- `page` (integer): Page number for pagination (default: 1)
- `limit` (integer): Items per page (default: 20, max: 100)
- `status` (string): Filter by status (active, idle, maintenance, offline)
- `type` (string): Filter by robot type (industrial, consumer, healthcare, education)

**Response:**
```json
{
  "data": [
    {
      "id": "rob_1234567890",
      "name": "Assembly Line Robot A1",
      "type": "industrial",
      "model": "GLB-1000",
      "status": "active",
      "location": {
        "facility": "Plant A",
        "zone": "Assembly Line 3",
        "coordinates": {
          "lat": 37.7749,
          "lng": -122.4194
        }
      },
      "firmware_version": "4.2.1",
      "last_maintenance": "2025-01-15T10:30:00Z",
      "uptime_hours": 2847,
      "created_at": "2024-03-20T08:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "pages": 8
  }
}
```

#### Get Robot Details
```http
GET /robots/{robot_id}
```

**Response:**
```json
{
  "id": "rob_1234567890",
  "name": "Assembly Line Robot A1",
  "type": "industrial",
  "model": "GLB-1000",
  "serial_number": "GLB1000-2024-0342",
  "status": "active",
  "health": {
    "overall": 98,
    "components": {
      "motors": 99,
      "sensors": 97,
      "battery": 95,
      "connectivity": 100
    }
  },
  "capabilities": [
    "precision_welding",
    "heavy_lifting",
    "quality_inspection",
    "autonomous_navigation"
  ],
  "configuration": {
    "max_speed": 2.5,
    "payload_capacity": 850,
    "work_envelope": {
      "reach": 3200,
      "height": 2800
    }
  },
  "telemetry": {
    "temperature": 32.5,
    "power_consumption": 4.2,
    "cycles_completed": 128456,
    "error_rate": 0.02
  }
}
```

#### Create Robot
```http
POST /robots
```

**Request Body:**
```json
{
  "name": "New Assembly Robot",
  "type": "industrial",
  "model": "GLB-1000",
  "location": {
    "facility": "Plant B",
    "zone": "Assembly Line 1"
  },
  "configuration": {
    "max_speed": 2.0,
    "safety_mode": "enhanced",
    "work_schedule": "24/7"
  }
}
```

#### Update Robot
```http
PUT /robots/{robot_id}
```

#### Delete Robot
```http
DELETE /robots/{robot_id}
```

### 2. Telemetry & Monitoring

#### Get Real-time Telemetry
```http
GET /robots/{robot_id}/telemetry
```

**Query Parameters:**
- `metrics` (array): Specific metrics to retrieve
- `interval` (string): Time interval (1m, 5m, 1h, 1d)
- `start_time` (ISO 8601): Start of time range
- `end_time` (ISO 8601): End of time range

**Response:**
```json
{
  "robot_id": "rob_1234567890",
  "metrics": {
    "temperature": {
      "current": 32.5,
      "unit": "celsius",
      "history": [
        {"timestamp": "2025-01-24T10:00:00Z", "value": 32.1},
        {"timestamp": "2025-01-24T10:05:00Z", "value": 32.3}
      ]
    },
    "power_consumption": {
      "current": 4.2,
      "unit": "kW",
      "average": 4.1
    },
    "position": {
      "x": 125.3,
      "y": 240.7,
      "z": 180.2,
      "rotation": {
        "pitch": 0,
        "yaw": 45,
        "roll": 0
      }
    }
  }
}
```

#### Stream Live Data (WebSocket)
```
wss://stream.globomantics.com/v2/robots/{robot_id}/stream
```

**Message Format:**
```json
{
  "type": "telemetry",
  "timestamp": "2025-01-24T10:15:30.123Z",
  "data": {
    "temperature": 32.6,
    "power": 4.3,
    "speed": 1.8,
    "status": "operating"
  }
}
```

### 3. Robot Control

#### Send Command
```http
POST /robots/{robot_id}/commands
```

**Request Body:**
```json
{
  "command": "move_to_position",
  "parameters": {
    "x": 150.0,
    "y": 200.0,
    "z": 100.0,
    "speed": 1.5
  },
  "priority": "normal",
  "safety_check": true
}
```

**Response:**
```json
{
  "command_id": "cmd_9876543210",
  "status": "accepted",
  "estimated_completion": "2025-01-24T10:16:45Z",
  "safety_validation": {
    "passed": true,
    "checks": ["collision_detection", "speed_limit", "work_envelope"]
  }
}
```

#### Emergency Stop
```http
POST /robots/{robot_id}/emergency-stop
```

**Response:**
```json
{
  "status": "stopped",
  "timestamp": "2025-01-24T10:15:32Z",
  "reason": "API emergency stop initiated",
  "affected_commands": ["cmd_9876543210", "cmd_9876543211"]
}
```

### 4. Fleet Management

#### Get Fleet Overview
```http
GET /fleet/overview
```

**Response:**
```json
{
  "total_robots": 156,
  "by_status": {
    "active": 142,
    "idle": 8,
    "maintenance": 4,
    "offline": 2
  },
  "by_type": {
    "industrial": 89,
    "consumer": 45,
    "healthcare": 15,
    "education": 7
  },
  "fleet_health": 96.5,
  "alerts": [
    {
      "severity": "warning",
      "robot_id": "rob_1234567895",
      "message": "Scheduled maintenance due in 48 hours"
    }
  ]
}
```

#### Batch Operations
```http
POST /fleet/batch-command
```

**Request Body:**
```json
{
  "robot_ids": ["rob_123", "rob_124", "rob_125"],
  "command": "update_firmware",
  "parameters": {
    "version": "4.2.2",
    "schedule": "off_hours"
  }
}
```

### 5. Analytics & Reporting

#### Get Performance Metrics
```http
GET /analytics/performance
```

**Query Parameters:**
- `robot_id` (string): Specific robot or "all"
- `metric` (string): efficiency, uptime, error_rate, productivity
- `period` (string): day, week, month, quarter, year

**Response:**
```json
{
  "period": "month",
  "metrics": {
    "overall_efficiency": 94.2,
    "average_uptime": 98.7,
    "tasks_completed": 45678,
    "error_rate": 0.3,
    "productivity_gain": 12.5
  },
  "trends": {
    "efficiency": "+2.3%",
    "uptime": "+0.5%",
    "error_rate": "-0.1%"
  }
}
```

### 6. Maintenance & Diagnostics

#### Run Diagnostic
```http
POST /robots/{robot_id}/diagnostics
```

**Request Body:**
```json
{
  "type": "comprehensive",
  "components": ["motors", "sensors", "software", "connectivity"]
}
```

**Response:**
```json
{
  "diagnostic_id": "diag_5432109876",
  "status": "completed",
  "duration_seconds": 45,
  "results": {
    "overall_health": 97,
    "issues_found": 1,
    "details": [
      {
        "component": "sensor_array_3",
        "status": "warning",
        "message": "Calibration drift detected",
        "recommendation": "Schedule calibration within 7 days"
      }
    ]
  }
}
```

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "ROBOT_NOT_FOUND",
    "message": "The requested robot does not exist",
    "details": {
      "robot_id": "rob_invalid123",
      "suggestion": "Check robot ID or use GET /robots to list available robots"
    }
  },
  "request_id": "req_abc123def456"
}
```

### Common Error Codes
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error
- `503` - Service Unavailable

## Rate Limiting
- Standard: 1000 requests per hour
- Premium: 10,000 requests per hour
- Enterprise: Unlimited

Headers:
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1706094000
```

## Webhooks

### Configure Webhook
```http
POST /webhooks
```

**Request Body:**
```json
{
  "url": "https://your-app.com/webhook",
  "events": ["robot.status_changed", "maintenance.required", "error.critical"],
  "secret": "FAKE_WEBHOOK_SECRET_EXAMPLE_DO_NOT_USE"
}
```

### Webhook Payload
```json
{
  "event": "robot.status_changed",
  "timestamp": "2025-01-24T10:30:00Z",
  "data": {
    "robot_id": "rob_1234567890",
    "previous_status": "active",
    "new_status": "maintenance",
    "reason": "Scheduled maintenance"
  },
  "signature": "sha256=abc123..."
}
```

## SDKs & Code Examples

### Python
```python
from globomantics import RoboticsAPI

api = RoboticsAPI(api_key="FAKE_KEY_EXAMPLE_ABC123_DO_NOT_USE")

# List all robots
robots = api.robots.list(status="active")

# Control a robot
robot = api.robots.get("rob_1234567890")
robot.move_to(x=150, y=200, z=100)

# Monitor telemetry
telemetry = robot.get_telemetry(metrics=["temperature", "power"])
```

### JavaScript/Node.js
```javascript
const GlobomanticsAPI = require('@globomantics/robotics-api');

const api = new GlobomanticsAPI({ apiKey: 'FAKE_KEY_EXAMPLE_XYZ789_DO_NOT_USE' });

// Async/await example
async function controlRobot() {
  const robot = await api.robots.get('rob_1234567890');
  await robot.sendCommand({
    command: 'move_to_position',
    parameters: { x: 150, y: 200, z: 100 }
  });
}

// Real-time streaming
api.robots.stream('rob_1234567890', (data) => {
  console.log('Telemetry:', data);
});
```

### cURL Examples
```bash
# Get robot details
curl -X GET https://api.globomantics.com/v2/robots/rob_1234567890 \
  -H "Authorization: Bearer FAKE_TOKEN_EXAMPLE_ABC123XYZ_DO_NOT_USE"

# Send command
curl -X POST https://api.globomantics.com/v2/robots/rob_1234567890/commands \
  -H "Authorization: Bearer FAKE_TOKEN_EXAMPLE_DEF456_DO_NOT_USE" \
  -H "Content-Type: application/json" \
  -d '{
    "command": "move_to_position",
    "parameters": {"x": 150, "y": 200, "z": 100}
  }'
```

## API Changelog

### v2.3.0 (2025-01-15)
- Added batch command support for fleet management
- Improved WebSocket stability
- New diagnostic endpoints

### v2.2.0 (2024-12-01)
- Enhanced telemetry streaming
- Added predictive maintenance API
- Performance improvements

### v2.1.0 (2024-10-15)
- Initial public API release
- Core robot management endpoints
- Basic telemetry support