package cse.rnsit.studentgrievance.controller;

import cse.rnsit.studentgrievance.entity.Category;
import cse.rnsit.studentgrievance.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@SuppressWarnings("unused")
@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/add/{category_name}")
    public ResponseEntity<Object> addCategory(@PathVariable String category_name) {
        Category category = new Category();
        category.setCategory_name(category_name);
        try {
            categoryService.save(category);
            return new ResponseEntity<>("Added" ,HttpStatus.OK);
        } catch (DataIntegrityViolationException dive) {
            return new ResponseEntity<>("Duplicate entry", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/add-all/{cat_size}")
    public ResponseEntity<Object> addCategories(@RequestBody List<Category> categories, @PathVariable int cat_size) {
        try {
            categoryService.saveAll(categories);
            return new ResponseEntity<>("Added" ,HttpStatus.OK);
        } catch (DataIntegrityViolationException dive) {
            return new ResponseEntity<>("Duplicate entry", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("grievances/{category_name}")
    public ResponseEntity<Object> getGrievances(@PathVariable String category_name) {
        Optional<Category> categoryOptional = categoryService.findByName(category_name);
        //noinspection OptionalGetWithoutIsPresent
        return new ResponseEntity<>(categoryOptional.get().getGrievances(), HttpStatus.OK);
    }

    @GetMapping("/popular")
    public ResponseEntity<Object> getPopularCategories() {
        List<String> categoryNames = categoryService.getCategoryNameByPopularity();
        return new ResponseEntity<>(categoryNames, HttpStatus.OK);
    }

    @PatchMapping("/increment/{category_name}")
    public ResponseEntity<Object> updatePopularity(@PathVariable String category_name) {
        categoryService.updatePopularity(category_name);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
