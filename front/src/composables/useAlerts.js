import { ref } from "vue";
import { getIndicateurs, postAlerte } from "@/services/api.service";

const indicateurs = ref([]);
const data = ref({
  resolved: false,
  date: "",
  indicateur: "",
  indicateur_valeur: "",
});

export function useIndicateur() {
  const fetchIndicateurs = async () => {
    const response = await getIndicateurs();

    response.data.forEach((indicateur) => {
      indicateurs.value.push(indicateur);
    });

    // Vérification des indicateurs

    for (const i of indicateurs.value) {
      if (
        (i.attributes.min > i.attributes.seuil ||
          i.attributes.max < i.attributes.seuil) &&
        !i.attributes.alertes.data.find((x) => !x.attributes.resolved)
      ) {
        // SET DATA
        const dateAjd = new Date().toISOString();
        data.value.date = dateAjd;
        data.value.indicateur = i;
        data.value.indicateur_valeur = i.attributes.seuil;

        // POSTALERTE
        const response = await postAlerte(data.value);
        return response;
      }
    }
  };

  return { indicateurs, fetchIndicateurs, data };
}
