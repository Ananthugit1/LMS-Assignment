package com.app.LMS.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import com.app.LMS.entity.branchentity;

@RepositoryRestResource
public interface branchrepositories extends JpaRepository<branchentity, Long> {
    @Query("SELECT DISTINCT b.Sname FROM branchentity b")
    List<String> findDistinctSname();

    @Query("SELECT b.Cname FROM branchentity b WHERE b.Sname = :sname")
    List<String> findCnameBySname(String sname);

    @Query("Select b.Branchadd ,b.Contact FROM branchentity b WHERE b.Cname = :cname")
    List<Object[]> findBranchaddByCname(String cname);
    
    @Modifying
    @Query("DELETE FROM branchentity b WHERE b.Cname = :cname")
    void deleteByCname(@Param("cname") String cname);
}
