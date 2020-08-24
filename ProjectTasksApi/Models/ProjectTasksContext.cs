using Microsoft.EntityFrameworkCore;

namespace ProjectTasksApi.Models
{
    public class ProjectTasksContext : DbContext
    {
        public ProjectTasksContext(DbContextOptions<ProjectTasksContext> options)
            : base(options)
        {
        }

        public DbSet<ProjectTasksItem> ProjectTasksItems { get; set; }
    }
}