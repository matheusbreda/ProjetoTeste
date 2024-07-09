package br.com.syma.jframe.sli;

import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Tools {

	public static String enviaGetAll(String URL) {
		System.out.println("\t\t------[ enviaGetAll jwt ]------");
		
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		//headers.set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJsb2dpbi1hdXRoLWFwaSIsInN1YiI6Ikp1bGlhIiwiZXhwIjoxNzIwNTM4MTIzfQ.HlZMogdQyBxYb8q7IPN-QfD--FNKBWsMVPxA--9jM30");
				
		RequestEntity<Object> request = new RequestEntity<>(headers, HttpMethod.GET, URI.create(URL));
		ResponseEntity<Object[]> response = restTemplate.exchange(request, Object[].class);
		return Tools.classToJason(response.getBody());
	}

	public static String classToJason(Object classeX) {
		String retorno = "";
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			retorno = objectMapper.writeValueAsString(classeX);
		} catch (JsonProcessingException e) {
			System.err.println("ERRO: classToJason" + e.getClass().getSimpleName() + " | " + e.getLocalizedMessage() );
		}
		return retorno;
	}
}
