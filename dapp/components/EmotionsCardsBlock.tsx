import EmotionCardWagmi from "./EmotionCardWagmi"
import { SimpleGrid, Box } from "@chakra-ui/react"

export default function EmotionsCardsBlock() {
    return (
        <SimpleGrid columns={2} spacing={10}>
            <EmotionCardWagmi
                coreEmotionName="JOY"
                imageUrl="https://cdn.pixabay.com/photo/2016/08/13/17/59/background-1591227_960_720.jpg"
            />
            <EmotionCardWagmi
                coreEmotionName="FEAR"
                imageUrl="https://cdn.pixabay.com/photo/2016/12/08/19/53/fractals-1892996_960_720.jpg"
            />
            <EmotionCardWagmi
                coreEmotionName="ANGER"
                imageUrl="https://cdn.pixabay.com/photo/2017/07/08/09/49/red-2483933_960_720.jpg"
            />
            <EmotionCardWagmi
                coreEmotionName="SADNESS"
                imageUrl="https://cdn.pixabay.com/photo/2014/06/16/23/40/blue-370128_960_720.png"
            />
            <EmotionCardWagmi
                coreEmotionName="DISGUST"
                imageUrl="https://cdn.pixabay.com/photo/2017/03/25/17/55/color-2174043_960_720.png"
            />
            <EmotionCardWagmi
                coreEmotionName="LOVE"
                imageUrl="https://cdn.pixabay.com/photo/2016/04/18/16/22/gradient-1336854_960_720.jpg"
            />
        </SimpleGrid>
    )
}
