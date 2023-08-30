package cse.rnsit.studentgrievance.repository;

import cse.rnsit.studentgrievance.entity.Category;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c.category_name FROM Category c ORDER BY c.popularity DESC LIMIT 4")
    List<String> findCategoryNameByPopularity();

    @Query("SELECT c FROM Category c WHERE c.category_name =:email")
    Optional<Category> findByCategory_name(@Param("email") String name);

    @Transactional
    @Modifying
    @Query("UPDATE Category c SET c.popularity = c.popularity + 1 WHERE c.category_name =:category_name")
    void updatePopularity(@Param("category_name") String category_name);
}
