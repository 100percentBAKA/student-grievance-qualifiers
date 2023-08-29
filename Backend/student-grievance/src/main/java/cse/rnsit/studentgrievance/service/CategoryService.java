package cse.rnsit.studentgrievance.service;

import cse.rnsit.studentgrievance.entity.Category;
import cse.rnsit.studentgrievance.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @SuppressWarnings("unused")
    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional
    public void save(Category category) throws DataIntegrityViolationException {
        try {
            categoryRepository.save(category);
        } catch (DataIntegrityViolationException dive) {
            throw new DataIntegrityViolationException("Duplicate entry");
        }
    }

    @Transactional
    public void saveAll(List<Category> categories) throws DataIntegrityViolationException {
        try {
            categoryRepository.saveAll(categories);
        } catch (DataIntegrityViolationException dive) {
            throw new DataIntegrityViolationException("Duplicate entry");
        }
    }

    public List<String> getCategoryNameByPopularity() {
        return categoryRepository.findCategoryNameByPopularity();
    }
}
