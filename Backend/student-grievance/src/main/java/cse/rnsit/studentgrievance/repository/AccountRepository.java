package cse.rnsit.studentgrievance.repository;

import cse.rnsit.studentgrievance.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByEmail(String email);

    @Query("SELECT COUNT(*) FROM Account a WHERE a.email =:email ")
    long isEmailAvailable(@Param("email") String email);

    @Query("SELECT a.is_admin FROM Account a WHERE a.email =:email")
    Optional<Boolean> findIsAdminByEmail(@Param("email") String email);

    @Query("SELECT a.password FROM Account a WHERE a.email =:email")
    Optional<String> findPasswordByEmail(@Param("email") String email);

    void deleteByEmail(String email);
}
