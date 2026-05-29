package com.trackify.repository;

import com.trackify.entity.Income;
import com.trackify.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {

    List<Income> findByUserOrderByDateDesc(User user);

    @Query("SELECT COALESCE(SUM(i.amount), 0) FROM Income i WHERE i.user = :user")
    BigDecimal sumAmountByUser(User user);

    List<Income> findByUserAndDateAfterOrderByDateDesc(User user, LocalDate date);
}
