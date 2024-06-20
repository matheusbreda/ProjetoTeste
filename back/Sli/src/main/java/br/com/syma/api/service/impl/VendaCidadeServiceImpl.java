package br.com.syma.api.service.impl;


import java.util.List;


import javax.persistence.EntityManager;
import javax.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import br.com.syma.api.dto.VendaCidadeDTO;
import br.com.syma.api.service.VendaCidadeService;

@Component
public class VendaCidadeServiceImpl implements VendaCidadeService {

    @Autowired
    private EntityManager em;
    

    @Override
    public List<VendaCidadeDTO> listar() {

        /*String query1 = "select c.nome as cliente, v.valor_total, c2.nome as cidade " +
                        "from venda v " +
                        "inner join cliente c on v.id_cliente = c.id " +
                        "inner join cidade c2 on c.id_cidade = c2.id " +
                        "order by c2.id";

       
        String query2 = "select cidade, count(cidade) " +
                        "from ( " + query1 + " ) as vendas_por_cidade " +
                        "group by cidade";
        System.out.println(query2);
        Query query = em.createNativeQuery(query2, VendaCidadeDTO.class);
		
		@SuppressWarnings("unchecked")
		List<VendaCidadeDTO> listResult = query.getResultList();		
		
		return listResult;*/  
    	
    	String nativeQuery = "select cidade, sum(valor_total) from\r\n"
    			+ "(select c.nome cliente, v.valor_total, c2.nome cidade from  venda v \r\n"
    			+ "  inner join cliente c on v.id_cliente = c.id\r\n"
    			+ "  inner join cidade c2 on c.id_cidade  = c2.id \r\n"
    			+ "  order by c2.id) \r\n"
    			+ "  group by cidade;"
    			;
    	
    	Query query = em.createNativeQuery(nativeQuery, VendaCidadeDTO.class);
		
		@SuppressWarnings("unchecked")
		List<VendaCidadeDTO> listResult = query.getResultList();		
		
		return listResult;
    }
}

