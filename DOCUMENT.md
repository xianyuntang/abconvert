# Architecture
![architecture.png](assets/architecture.png)
## Components

1. backend
2. gateway
3. event-worker


### backend
The backend receives requests from the gateway and handles A/B testing version control.

### event-worker
The event worker acts as a Kafka broker, processing user events and store its to clickhouse.

### gateway 
The gateway dispatches user events to the Kafka server and proxies requests to the backend.

**The communication protocol between the backend and gateway is GRPC.**
**All components can extend horizontal.**

## Scalability & Performance 

In the 4 Core CPU and 4GB memory machine with 60/20MBps network.

500 clients
![img.png](assets/1000client.png)

1000 clients
![img.png](assets/1000client.png)



## Data storage

The events will be stored in clickhouse for high throughput, while item information will be handled in postgres for atomicity, given that item information doesn't require high throughput. 

*(it can be rewritten in command query responsibility segregation if needed  )*

also the item information can be stored to the cache like redis (currently it is not implemented)


## Fault Tolerance

The system can be deployed on kubernetes to make sure the fault tolerance.
