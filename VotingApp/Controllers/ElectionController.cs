using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VotingApp.Data;
using VotingApp.Models;

namespace VotingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ElectionController : ControllerBase
    {
        private readonly VotingAppDbContext _context;

        public ElectionController(VotingAppDbContext context)
        {
            _context = context;
        }

        // GET: api/Election
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Election>>> GetElection()
        {
          if (_context.Election == null)
          {
              return NotFound();
          }
            return await _context.Election.ToListAsync();
        }

        // GET: api/Election/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Election>> GetElection(int id)
        {
          if (_context.Election == null)
          {
              return NotFound();
          }
            var election = await _context.Election.FindAsync(id);

            if (election == null)
            {
                return NotFound();
            }

            election.Candidate1 = await _context.Person.FindAsync(election.Candidate1Username);
            election.Candidate2 = await _context.Person.FindAsync(election.Candidate2Username);
            
            return election;
        }

        // PUT: api/Election/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutElection(int id, Election election)
        {
            if (id != election.ID)
            {
                return BadRequest();
            }

            _context.Entry(election).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ElectionExists(id))
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

        // POST: api/Election
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Election>> PostElection(Election election)
        {
          if (_context.Election == null)
          {
              return Problem("Entity set 'VotingAppDbContext.Election'  is null.");
          }
            _context.Election.Add(election);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetElection", new { id = election.ID }, election);
        }

        // DELETE: api/Election/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteElection(int id)
        {
            if (_context.Election == null)
            {
                return NotFound();
            }
            var election = await _context.Election.FindAsync(id);
            if (election == null)
            {
                return NotFound();
            }

            _context.Election.Remove(election);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ElectionExists(int id)
        {
            return (_context.Election?.Any(e => e.ID == id)).GetValueOrDefault();
        }
    }
}
