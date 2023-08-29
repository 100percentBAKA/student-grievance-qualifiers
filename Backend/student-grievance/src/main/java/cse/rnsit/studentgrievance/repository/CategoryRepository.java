package cse.rnsit.studentgrievance.repository;

import cse.rnsit.studentgrievance.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c.category_name FROM Category c ORDER BY c.popularity DESC LIMIT 4")
    List<String> findCategoryNameByPopularity();
}
