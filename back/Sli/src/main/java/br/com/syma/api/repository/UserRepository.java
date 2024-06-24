package br.com.syma.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.syma.api.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	Optional<User> findByUsername(String username);

}
