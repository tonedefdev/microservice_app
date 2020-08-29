using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectTasksApi.Models;

namespace ProjectTasksApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectTasksItemsController : ControllerBase
    {
        private readonly ProjectTasksContext _context;

        public ProjectTasksItemsController(ProjectTasksContext context)
        {
            _context = context;
        }

        // GET: api/ProjectTasksItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectTasksItem>>> GetProjectTasksItems()
        {
            return await _context.ProjectTasksItems.ToListAsync();
        }

        // GET: api/ProjectTasksItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectTasksItem>> GetProjectTasksItem(long id)
        {
            var projectTasksItem = await _context.ProjectTasksItems.FindAsync(id);

            if (projectTasksItem == null)
            {
                return NotFound();
            }

            return projectTasksItem;
        }

        // PUT: api/ProjectTasksItems/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectTasksItem(long id, ProjectTasksItem projectTasksItem)
        {
            if (id != projectTasksItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(projectTasksItem).State = EntityState.Modified;

            try
            {
                _context.ProjectTasksItems.Update(projectTasksItem);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectTasksItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ProjectTasksItems
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ProjectTasksItem>> PostProjectTasksItem(ProjectTasksItem projectTasksItem)
        {
            _context.ProjectTasksItems.Add(projectTasksItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjectTasksItem", new { id = projectTasksItem.Id }, projectTasksItem);
        }

        // DELETE: api/ProjectTasksItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProjectTasksItem>> DeleteProjectTasksItem(long id)
        {
            var projectTasksItem = await _context.ProjectTasksItems.FindAsync(id);
            if (projectTasksItem == null)
            {
                return NotFound();
            }

            _context.ProjectTasksItems.Remove(projectTasksItem);
            await _context.SaveChangesAsync();

            return projectTasksItem;
        }

        private bool ProjectTasksItemExists(long id)
        {
            return _context.ProjectTasksItems.Any(e => e.Id == id);
        }
    }
}
