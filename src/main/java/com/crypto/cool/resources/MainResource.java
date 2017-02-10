package com.crypto.cool.resources;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.crypto.cool.dto.CryptoCoin;
import com.crypto.cool.service.CryptoCoins;
import org.springframework.beans.factory.annotation.Autowired;

import com.crypto.cool.dto.CardDto;
import com.crypto.cool.service.IBMService;
import com.crypto.cool.service.RandomChartService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ibm.watson.developer_cloud.alchemy.v1.AlchemyDataNews;
import com.ibm.watson.developer_cloud.alchemy.v1.model.DocumentsResult;

@Path("/mainresource")
public class MainResource {

	@Autowired
	private RandomChartService randomChartService;

	@Autowired
	private IBMService ibmService;

	@Autowired
	private CryptoCoins cryptoCoins;

	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String getIt(){
		return "Test. Got it!";
	}

	@GET
	@Path("/chart/{price}")
	@Produces(MediaType.TEXT_PLAIN)
	public String getCardsValues(@PathParam("price") BigDecimal price) {
		StringBuilder stringBuilder = new StringBuilder();
		for (Double aDouble : randomChartService.generate(price)) {
			stringBuilder.append(aDouble + "|");
		}
		return stringBuilder.toString();
	}

	@GET
	@Path("/cards")
	@Produces(MediaType.TEXT_PLAIN)
	public String getCardsValues() throws JsonProcessingException {
		return new ObjectMapper().writeValueAsString(ibmService.getCardsValues());
	}

	@GET
	@Path("/watson-test")
	@Produces(MediaType.APPLICATION_JSON)
	public DocumentsResult watsonDo(){
		AlchemyDataNews service = new AlchemyDataNews();
		service.setApiKey("d816d0de9724e4f9d1588afaf56f601c9dfd0268");

		Map<String, Object> params = new HashMap<>();

		params.put(AlchemyDataNews.RETURN,
				"enriched.url.title,enriched.url.url,enriched.url.author,enriched.url.publicationDate,enriched.url.enrichedTitle.entities,enriched.url.enrichedTitle.docSentiment");
		params.put(AlchemyDataNews.START, "1440720000");
		params.put(AlchemyDataNews.END, "1441407600");
		params.put(AlchemyDataNews.COUNT, 7);

		DocumentsResult result = service.getNewsDocuments(params).execute();

		System.out.println(result);
		return result;
	}


	@GET
	@Path("/coinmarker")
	@Produces(MediaType.TEXT_PLAIN)
	public String getAllCryptos() throws IOException {
		return new ObjectMapper().writeValueAsString(cryptoCoins.getBestCoins());
	}

}
