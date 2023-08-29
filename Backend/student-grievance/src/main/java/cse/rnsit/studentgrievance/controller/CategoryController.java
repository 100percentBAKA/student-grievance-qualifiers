package cse.rnsit.studentgrievance.controller;

import cse.rnsit.studentgrievance.entity.Category;
import cse.rnsit.studentgrievance.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        category.setPopularity(0);
        try {
            categoryService.save(category);
            return new ResponseEntity<>("Added" ,HttpStatus.OK);
        } catch (DataIntegrityViolationException dive) {
            return new ResponseEntity<>("Duplicate entry", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/add-all/{cat_size}")
    public ResponseEntity<Object> addCategories(@RequestBody List<Category> categories, @PathVariable int cat_size) {
        for(int index = 0; index < cat_size; index++)
            categories.get(index).setPopularity(0);
        try {
            categoryService.saveAll(categories);
            return new ResponseEntity<>("Added" ,HttpStatus.OK);
        } catch (DataIntegrityViolationException dive) {
            return new ResponseEntity<>("Duplicate entry", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/popular")
    public ResponseEntity<Object> getPopularCategories() {
        List<String> categoryNames = categoryService.getCategoryNameByPopularity();
        return new ResponseEntity<>(categoryNames, HttpStatus.OK);
    }
}
