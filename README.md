# Laravel DNS Lookup

This project is a representation of small dns application with Laravel and Nextjs.


## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/sadeqane/dnsninja.git
    cd dnsninja
    docker-compose up -d
    ```


2. Visit the following URL in your browser:

   ```bash
   http://localhost
   ```

## Docker Compose Commands

- Start containers: `docker compose up -d`
- Stop containers: `docker compose down`
- View logs: `docker compose logs`

## Troubleshooting

If you encounter any issues, check the logs using:

   ```bash
   docker compose logs -f dnsninja-backend
   docker compose logs -f dnsninja-frontend
   ```
   
## Cache strategy

Storage Location  
>>Choose a suitable directory within your project for storing cached data files. Ensure proper permissions for file access.

Cache Key Generation  
>>Create a unique cache key based on the domain name and app name.

Cache Expiration   
>>Utilize the TTL value retrieved from the SOA record of the domain to determine the cache expiration time.

Cache File Format  
>>JSON format for storing cached data.

Cache Check    
>>Before making an API call, check if a cached data exists for the given key and if it's still valid based on the expiration time.

Cache Hit  
>>In the case of a valid cache, retrieve the data from the file and return it. Otherwise, API will call, store the retrieved data in a new cache, and return it.