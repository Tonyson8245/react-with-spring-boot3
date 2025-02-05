package com.packt.cardatabase.domain;



import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface CarRepository extends CrudRepository<Car,Long>  {

	//브랜드 검색
	List<Car> findByBrand(@Param("brand") String brand);
	
	//색 검색
	List<Car> findByColor(@Param("color") String color);

	//연 검색
	List<Car> findByModelYear(@Param("modelYear") int modelYear);
		
	//브랜드와 모델로 자동차 검색
	List<Car> findByBrandAndModel(@Param("brand") String brand,@Param("model")String Model);
		
	//브랜드 또는 색상으로 자동차 검색
	List<Car> findByBrandAndColor(@Param("brand") String brand,@Param("color")String color);

	//브랜드로 자동차를 검색하고 연동 정렬
	List<Car> findByBrandOrderByModelYearAsc(@Param("brand") String brand);
	
	//SQL 문을 이용해 브랜드로 자동차 검색
	@Query("select c from Car c where c.brand = ?1")
	List<Car> findByBrandSQL(@Param("brand") String brand);
	
	//SQL 문으 이용해 브랜드로 자동차를 검색
	@Query("select c from Car c where c.brand like %?1")
	List<Car> findByBrandEndsWith(@Param("brand") String brand);
}

