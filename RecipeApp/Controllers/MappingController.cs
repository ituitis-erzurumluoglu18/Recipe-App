using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecipeApp.Domain;
using RecipeApp.Repositories;

namespace RecipeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MappingController : ControllerBase
    {
        private IMappingRepository _mappingService;

        public MappingController()
        {
            _mappingService = new MappingRepository();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var mapping = await _mappingService.GetAllMappingsByRecipeId(id);
            if (mapping != null)
            {
                return Ok(mapping);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Mapping mapping)
        {
            var createdMapping = await _mappingService.Add(mapping);
            //var createdIngredient = await _ingredientsService.Add(ingredient);
            return CreatedAtAction("Get", new { id = createdMapping.MappingID }, createdMapping);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var map = await _mappingService.GetById(id);
            if (map != null)
            {
                await _mappingService.Remove(map);
                return Ok();
            }
            return NotFound();
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Mapping mapping)
        {
            if (_mappingService.GetById(mapping.MappingID) != null)
            {
                await _mappingService.Update(mapping);
                return Ok();
            }
            return NotFound();
        }
    }
}
