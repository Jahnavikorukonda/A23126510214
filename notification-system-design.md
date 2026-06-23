# Notification System Design

## Stage 1: System Design

### Architecture

Notification Producer → Message Queue (Kafka/RabbitMQ) → Notification Processing Service → Database → Notification API Service → Users

### Components

* Notification Producer
* Message Queue
* Notification Processing Service
* Database
* API Service
* Priority Inbox Service

---

## Stage 2: Database Design

### Notifications Table

| Column    | Type     |
| --------- | -------- |
| ID        | UUID     |
| Type      | VARCHAR  |
| Message   | TEXT     |
| Timestamp | DATETIME |
| Priority  | INTEGER  |

### Users Table

| Column | Type    |
| ------ | ------- |
| UserID | UUID    |
| Name   | VARCHAR |
| Email  | VARCHAR |

### Indexes

* Priority
* Timestamp
* Type
* Composite Index(Priority, Timestamp)

---

## Stage 3: Query Optimization

```sql
SELECT *
FROM Notifications
ORDER BY Priority DESC, Timestamp DESC
LIMIT 10;
```

Optimization Techniques:

* Indexing
* Pagination
* Query Caching
* Avoid Full Table Scans

---

## Stage 4: Scaling Solution

* Load Balancer
* Multiple API Instances
* Redis Cache
* Read Replicas
* Database Sharding
* Kafka Partitions

---

## Stage 5: Notify All Architecture

Producer → Kafka Topic → Consumer Workers → Notification Delivery Service → Users

Advantages:

* High Throughput
* Fault Tolerance
* Horizontal Scalability
* Low Latency

---

## Stage 6: Implementation

Implemented a Priority Inbox Service using Node.js and Express.

Priority Order:

1. Placement
2. Result
3. Event

Notifications are sorted using:

* Priority
* Latest Timestamp

Top 10 notifications are returned through the API endpoint.
