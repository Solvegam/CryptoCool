package com.crypto.cool.resources;

import java.util.HashMap;
import java.util.Map;

import java.math.BigDecimal;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.ibm.watson.developer_cloud.alchemy.v1.AlchemyDataNews;
import com.ibm.watson.developer_cloud.alchemy.v1.model.DocumentsResult;

@Path("mainresource")
public class MainResource {

	@Autowired
	private RandomChartService randomChartService;

	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String getIt(){
		return "Test. Got it!";
	}

	@GET
	@Path("/chart/{price}")
	public Map<String, List<BigDecimal>> getRandomChartValues(
			@PathParam("price") BigDecimal price){
		return randomChartService.generate(price);
	}

	@GET
	@Path("/watson-test")
	@Produces(MediaType.APPLICATION_JSON)
	public DocumentsResult watsonDo(){
		AlchemyDataNews service = new AlchemyDataNews();
		service.setApiKey("d816d0de9724e4f9d1588afaf56f601c9dfd0268");

		Map<String, Object> params = new HashMap<String, Object>();

		params.put(AlchemyDataNews.RETURN, "enriched.url.title,enriched.url.url,enriched.url.author,enriched.url.publicationDate,enriched.url.enrichedTitle.entities,enriched.url.enrichedTitle.docSentiment");
		params.put(AlchemyDataNews.START, "1440720000");
		params.put(AlchemyDataNews.END, "1441407600");
		params.put(AlchemyDataNews.COUNT, 7);

		DocumentsResult result = service.getNewsDocuments(params).execute();

		System.out.println(result);
		return result;
	}


}
