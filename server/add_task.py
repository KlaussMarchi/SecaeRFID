import requests
import json
from time import sleep


url = r'https://xi-secae-default-rtdb.firebaseio.com/'

data = [
    {"label": "Abertura da XI SECAE - Brindes, Sorteios e Horas Complementares", "value": "abertura"},
    {"label": "IEEE IFF Macaé - Apresentação do Ramo e Processo Seletivo", "value": "ieee"},
    {"label": "Apresentação Lab IF Maker", "value": "maker"},
    {"label": "Apresentação Atlética Lagartos", "value": "atletica"},
    {"label": "Apresentação Empresa Júnior (Root Locus)", "value": "empresa_junior"},
    {"label": "(OPENCADD) Masterclass MATLAB e SIMULINK", "value": "masterclass_matlab"},
    {"label": "(EXPOCIT/SECAE) Descarbonização na Indústria de Petróleo", "value": "descarbonizacao_petroleo"},
    {"label": "Minicurso de Git/Github", "value": "minicurso_git"},
    {"label": "Minicurso de Python", "value": "minicurso_python"},
    {"label": "(Foresea) Operações Marítimas e sua Integração com Diversas áreas de Engenharia", "value": "operacoes_maritimas"},
    {"label": "Minicurso Eletrônica Básica - Parte II", "value": "eletronica_basica_ii"},
    {"label": "Introdução à Cloud com AWS: Construindo seu Primeiro Site WordPress", "value": "cloud_aws"},
    {"label": "Minicurso de AutoCad (Empresa Júnior)", "value": "minicurso_autocad"},
    {"label": "LabSIM - Apresentação dos Projetos", "value": "labsim_projetos"},
    {"label": "(Halliburton) Completion Brazil", "value": "completion_brazil"},
    {"label": "(Perbas) Sonda de produção terrestre", "value": "sonda_producao_terrestre"},
    {"label": "Comunicações via Satélite", "value": "comunicacoes_satelite"},
    {"label": "Minicurso OpenCV", "value": "minicurso_opencv"},
    {"label": "introdução a impressão 3D", "value": "impressao_3d"},
    {"label": "Introdução ao SIMULINK", "value": "introducao_simulink"},
    {"label": "Minicurso de Arduino - Women In Engineering", "value": "arduino_wie"},
    {"label": "(Petrobrás) Descomissionamento de Sistemas Offshore - Uma visão geral... E prática!", "value": "descomissionamento_offshore"},
    {"label": "(Petrobrás) Jogando dados enviesados: o que o mal do século XXI tem a ver com o futuro dos estudantes de tecnologia?", "value": "dados_enviesados"},
    {"label": "(Petrobrás) Diversidade humana no mundo do trabalho: avanços e desafios contemporâneos", "value": "diversidade_trabalho"},
    {"label": "Modelagem 3D com fusion 360", "value": "modelagem_3d"},
    {"label": "Introdução ao Matlab", "value": "introducao_matlab"},
    {"label": "Visita Técnica Baker Hughes", "value": "visita_baker_hughes"},
    {"label": "Visita Técnica OneSubsea Base Rio das Ostras", "value": "visita_onesubsea_ro"},
    {"label": "Workshop WIE - Women In Engineering", "value": "workshop_wie"},
    {"label": "(EXPOCIT/SECAE) A contribuição do Engenheiro de Petróleo na Inovação, Tecnologia e Meio Ambiente", "value": "engenheiro_petroleo"},
    {"label": "Minicurso Power Bi (Empresa Júnior IFF Macaé)", "value": "power_bi"},
    {"label": "(SLB OneSubsea) Conhecendo a Engenharia de “Aftermarket” para Equipamentos Submarinos do Conjunto ANM", "value": "aftermarket_onesubsea"},
    {"label": "(SLB OneSubsea) Conceitos Básicos de Sistemas de Controle de Produção", "value": "controle_producao"},
    {"label": "Visita Técnica SLB", "value": "visita_slb"},
    {"label": "Visita Técnica ao Lenep (UENF)", "value": "visita_lenep"},
    {"label": "Minicurso Eletrônica Básica - Parte I", "value": "eletronica_basica_i"},
    {"label": "Estudo de Fontes Renováveis para aplicação offgrid e ongrid", "value": "fontes_renovaveis"},
    {"label": "(EXPOCIT/SECAE) PILOTE um SIMULADOR: O mundo do ROV (Empresa Underwater)", "value": "simulador_rov"},
    {"label": "Internet das Coisas (IoT) com ESP32", "value": "iot_esp32"},
    {"label": "(DOF) Desvendando o Mundo dos ROVs: Tecnologia e Carreira Promissora!", "value": "rov_tecnologia"},
    {"label": "(Fugro) Como se Tornar um Candidato Desejado pelo Mercado de Trabalho", "value": "candidato_desejado"},
    {"label": "O Polo de Inovação do IFF: O papel da inovação tecnológica como indutora de desenvolvimento social", "value": "polo_inovacao"},
    {"label": "Parcerias Internacionais, Experiências e Oportunidades para Pesquisa sobre Recursos Hídricos no IFF", "value": "pesquisa_hidricos"},
    {"label": "(SLB OneSubsea) Overview de Operações Offshore", "value": "onesubsea3"},
    {"label": "Visita Técnica OneSubsea", "value": "visita_onesubsea"}
]


def addDatabaseRow(tableName, newData, timeout=10):
    print('add data: ', newData)
    newData = json.dumps(newData)
    link = url + tableName + '.json'
    
    try:
        requests.post(link, data=newData, timeout=timeout)
    except:
        return False
    
    return True


for row in data:
    response = addDatabaseRow('activities', row)
    sleep(0.5)
