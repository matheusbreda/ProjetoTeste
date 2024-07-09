package br.com.syma.jframe.sli.view;

import javax.swing.JTable;
import java.awt.Color;
import java.util.ArrayList;
import java.util.List;
import javax.swing.JPanel;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.SwingConstants;
import java.awt.Font;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.TableModel;
import javax.swing.table.TableRowSorter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import br.com.syma.api.model.Venda;
import br.com.syma.jframe.sli.Tools;

import javax.swing.RowSorter;
import javax.swing.SortOrder;
import javax.swing.JScrollPane;

public class TelaVenda extends JFrame{
	
	private static final long serialVersionUID = 1L;

	public  static String enderecoServer = "http://localhost:1998";
	public static JTable tabVenda;
	private static DefaultTableModel tabVendaModel;
	public static TableRowSorter<TableModel> tabVendaSorter;
	private static ObjectMapper objectMapper = new ObjectMapper();


	public TelaVenda() {
		getContentPane().setLayout(null);
		 
		//TITULO
		JLabel lblNewLabel = new JLabel("Vendas");
		lblNewLabel.setBounds(10, 11, 614, 41);
		lblNewLabel.setFont(new Font("Arial", Font.BOLD, 20));
		lblNewLabel.setHorizontalAlignment(SwingConstants.CENTER);
		getContentPane().add(lblNewLabel);
		
		// ------------------------------------
		// TABELA VENDA
		// ------------------------------------
		tabVenda = new JTable();
		desenhaTabelaVenda();
		mostrarVendas();
		JScrollPane scrollPaneVenda = new JScrollPane();	
		scrollPaneVenda.setBounds(10, 63, 598, 214);
		scrollPaneVenda.setViewportView(tabVenda);
		getContentPane().add(scrollPaneVenda);
		
	}
	public void desenhaTabelaVenda() {
		
		
		String[] columnNames =  {"ID", "NOME", "CPF", "VALOR", "DATA" , "CIDADE" };
		tabVendaModel = new DefaultTableModel(columnNames, 0);
		tabVenda.setModel(tabVendaModel);
		tabVenda.setDefaultEditor(Object.class, null); // Do not edit lines
		
		//Sort
		tabVendaSorter = new TableRowSorter<TableModel>(tabVendaModel);
		tabVenda.setRowSorter(tabVendaSorter);
		List <RowSorter.SortKey> sortKeys = new ArrayList<RowSorter.SortKey>();
		sortKeys.add(new RowSorter.SortKey(1, SortOrder.ASCENDING));
		tabVendaSorter.setSortKeys(sortKeys);
		
		// Center Columns
		DefaultTableCellRenderer centerRenderer = new DefaultTableCellRenderer();
		centerRenderer.setHorizontalAlignment(SwingConstants.CENTER);
		
		// Color
		tabVenda.setGridColor(new Color(230, 230, 230));
		tabVenda.setAutoResizeMode(JTable.AUTO_RESIZE_LAST_COLUMN);
		
		// Sizes
		int col=0, wd=100; 							// ID
		tabVenda.getColumnModel().getColumn(col).setPreferredWidth(wd); 
		tabVenda.getColumnModel().getColumn(col).setMaxWidth(wd);
		tabVenda.getColumnModel().getColumn(col).setMinWidth(wd);
		
		col++; wd=100; 		// NOME
		tabVenda.getColumnModel().getColumn(col).setPreferredWidth(wd); 
		tabVenda.getColumnModel().getColumn(col).setMaxWidth(wd);
		tabVenda.getColumnModel().getColumn(col).setMinWidth(wd);
		
		col++; wd=100; 			// CPF
		tabVenda.getColumnModel().getColumn(col).setPreferredWidth(wd); 
		tabVenda.getColumnModel().getColumn(col).setMaxWidth(wd);
		tabVenda.getColumnModel().getColumn(col).setMinWidth(wd);
		tabVenda.getColumnModel().getColumn(col).setCellRenderer(centerRenderer);
		
		col++; wd=100; 			// VALOR
		tabVenda.getColumnModel().getColumn(col).setPreferredWidth(wd); 
		tabVenda.getColumnModel().getColumn(col).setMaxWidth(wd);
		tabVenda.getColumnModel().getColumn(col).setMinWidth(wd);
		tabVenda.getColumnModel().getColumn(col).setCellRenderer(centerRenderer);
		
		col++; wd=100; 			// DATA
		tabVenda.getColumnModel().getColumn(col).setPreferredWidth(wd); 
		tabVenda.getColumnModel().getColumn(col).setMaxWidth(wd);
		tabVenda.getColumnModel().getColumn(col).setMinWidth(wd);
		tabVenda.getColumnModel().getColumn(col).setCellRenderer(centerRenderer);

		col++; wd=100; 			// CIDADE
		tabVenda.getColumnModel().getColumn(col).setPreferredWidth(wd); 
		tabVenda.getColumnModel().getColumn(col).setMaxWidth(wd);
		tabVenda.getColumnModel().getColumn(col).setMinWidth(wd);
		tabVenda.getColumnModel().getColumn(col).setCellRenderer(centerRenderer);
		
		col++;
		tabVenda.getColumnModel().getColumn(col).setCellRenderer(centerRenderer);
			
	}

	public static void mostrarVendas() {
			
		try { 
			
			tabVendaModel.setRowCount(0);
		
			objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			Venda[] listaVenda = objectMapper.readValue( Tools.enviaGetAll("https://localhost:1998/api/venda"), Venda[].class);
			
			for (Venda vendaX: listaVenda) {
				if (vendaX.getId() != "") {
					Object[] dataRow = {
						vendaX.getId(),
						vendaX.getData(),
						vendaX.getValorTotal(),
						vendaX.getCliente().getNome(),
						vendaX.getCliente().getCpf(),
						vendaX.getCliente().getCidade().getNome(),
						
					};	
					
					tabVendaModel.addRow(dataRow);
				}	
			}
			
		} catch (JsonProcessingException e) {
			JOptionPane.showMessageDialog(null, e.getMessage(), "ERRO AO CARREGAR TREE LIST",  JOptionPane.ERROR_MESSAGE);
		}	
		 	
	}
	
	
}

