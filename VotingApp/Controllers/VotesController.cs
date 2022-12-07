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
    public class VotesController : ControllerBase
    {
        private readonly VotingAppDbContext _context;

        public VotesController(VotingAppDbContext context)
        {
            _context = context;
        }

        // GET: api/Votes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Votes>>> GetVotes()
        {
          if (_context.Votes == null)
          {
              return NotFound();
          }
            return await _context.Votes.ToListAsync();
        }

        // GET: api/Votes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Votes>> GetVotes(int id)
        {
          if (_context.Votes == null)
          {
              return NotFound();
          }
            var votes = await _context.Votes.FindAsync(id);

            if (votes == null)
            {
                return NotFound();
            }

            return votes;
        }

        // PUT: api/Votes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVotes(int id, Votes votes)
        {
            if (id != votes.VoteID)
            {
                return BadRequest();
            }

            _context.Entry(votes).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VotesExists(id))
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

        // POST: api/Votes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Votes>> PostVotes(Votes votes)
        {
          if (_context.Votes == null)
          {
              return Problem("Entity set 'VotingAppDbContext.Votes'  is null.");
          }
            _context.Votes.Add(votes);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVotes", new { id = votes.VoteID }, votes);
        }

        // DELETE: api/Votes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVotes(int id)
        {
            if (_context.Votes == null)
            {
                return NotFound();
            }
            var votes = await _context.Votes.FindAsync(id);
            if (votes == null)
            {
                return NotFound();
            }

            _context.Votes.Remove(votes);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VotesExists(int id)
        {
            return (_context.Votes?.Any(e => e.VoteID == id)).GetValueOrDefault();
        }
    }
}
