namespace ProjectTasksApi.Models
{
    public class ProjectTasksItem
    { 
        public long Id { get; set; }
        public string Name { get; set; }
        public string Owner { get; set; }
        public string Assignee { get; set; }
        public bool IsComplete { get; set; }
    }
}
