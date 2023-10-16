## Notes

About first-level cache

With JPA, first-level cache is applied by default
It’s a session scoped cache which ensures that each entity instance is loaded only once in the persistent context

Once the session is closed, the first-level cache is terminated as well. This is actually desirable, as it allows for concurrent sessions to work with entity instances in isolation from each other.

Why use a second-level cache?
The second-level cache provides a copy of the query results to the persistence context.